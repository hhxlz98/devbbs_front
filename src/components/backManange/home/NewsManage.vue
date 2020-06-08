<template>
  <div class="newsManage_container">
    <el-dialog
      :visible.sync="addDialogVisible"
      width="25%">
      <template slot="title">
        <span>添加广告</span>
      </template>
      <NewsForm :isAdd="true" :info="addNewsInfo" @add-success="addSuccess"></NewsForm>
    </el-dialog>
    <el-dialog
      :visible.sync="updateDialogVisible"
      width="25%">
      <template slot="title">
        <span>更新广告</span>
      </template>
      <NewsForm :isAdd="false" :info="updateNewsInfo" @update-success="updateSuccess"></NewsForm>
    </el-dialog>
    <el-dialog
      :visible.sync="imgDialogVisible"
      width="25%">
      <img :src="CommonUtil.baseUrl + currentImg" />
    </el-dialog>
    <el-table
       :data="newsList"
       style="width: 100%">
       <el-table-column
         label="广告描述"
         width="180">
         <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
             <span>{{scope.row.newsIntro}}</span>
             <span slot="reference">
               {{scope.row.newsIntro | stringLengthConversion(30)}}
             </span>
           </el-popover>
         </template>
       </el-table-column>
       <el-table-column
         label="广告图片"
         width="120">
         <template slot-scope="scope">
           <el-button type="text" size="mini" @click="clickLookBtn(scope.$index, scope.row)">点击查看</el-button>
         </template>
       </el-table-column>
       <el-table-column
         label="广告链接">
         <template slot-scope="scope">
           <a :href="scope.row.toLink" target="_blank">{{scope.row.toLink}}</a>
         </template>
       </el-table-column>
       <el-table-column label="是否启用"
       width="120">
         <template slot-scope="scope">
           <el-checkbox v-model="scope.row.valid" size="mini" @change="newsValidChange(scope.$index, scope.row)"></el-checkbox>
         </template>
       </el-table-column>
       <el-table-column label="操作"
       width="200">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-popconfirm
             confirmButtonText='确认'
             cancelButtonText='取消'
             icon="el-icon-info"
             iconColor="red"
             title="确认删除"
             @onConfirm="handleDelete(scope.$index, scope.row)"
           >
           <el-button
             size="mini"
             type="danger"
             slot="reference"
            >删除</el-button>
           </el-popconfirm>
         </template>
       </el-table-column>
       <el-table-column label="操作"
       width="50">
         <template slot="header" slot-scope="scope">
            <el-button title="添加" style="display: inline-block; float: right;" type="text" size="large" @click="clickAddBtn"><i class="fa fa-plus-square" aria-hidden="true"></i></el-button>
         </template>
       </el-table-column>
     </el-table>
  </div>

</template>

<script>
  import { getAllNewsList } from '@/api'
  import { updateNewsValid } from '@/api'
  import { updateNews } from '@/api'
  import { deleteNews } from '@/api'

  import NewsForm from './NewsForm.vue'
  export default {
    data() {
      return {
        imgDialogVisible: false,
        currentImg: '',
        addDialogVisible: false,
        updateDialogVisible: false,
        currentIndex: 0,
        newsList: [],
        addNewsInfo: {
          newsIntro: '',
          imgUrl: '',
          toLink: '',
          valid: false,
        },
        updateNewsInfo: {
          newsId: 0,
          newsIntro: '',
          imgUrl: '',
          toLink: '',
          valid: false,
        },

      }
    },
    methods: {
      getNews() {
        getAllNewsList().then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1204') {
            this.newsList = data.info;
          }
        })
      },
      clickLookBtn(index, row) {
        this.currentImg = row.imgUrl;
        this.imgDialogVisible = true;
      },
      newsValidChange(index, row) {
        this.updateValid(row.newsId, row.valid, index);
      },
      updateValid(newsId, val, index) {
        updateNewsValid(newsId, val).then(response => {
          const data = response.data;
          console.log(data);
          if (data.code == '1203') {
            this.$message.success("已更新");
            this.newsList[index].valid = val;
          } else {
            this.$message.error("更新失败");
            this.newsList[index].valid = !val;
          }
        })
      },
      handleEdit(index, row) {
        this.updateNewsInfo.newsId = row.newsId;
        this.updateNewsInfo.newsIntro = row.newsIntro;
        this.updateNewsInfo.imgUrl = row.imgUrl;
        this.updateNewsInfo.toLink = row.toLink;
        this.updateNewsInfo.valid = row.valid;
        this.currentIndex = index;
        this.updateDialogVisible = true;
      },
      handleDelete(index, row) {
        deleteNews(row.newsId).then(response => {
          const data = response.data;
          if (data.code == '1206') {
            this.$message.success("已删除")
            this.newsList.splice(index, 1);
          }
        })

      },
      clickAddBtn() {
        this.addDialogVisible = true;
      },
      updateSuccess(val) {
        this.updateDialogVisible = false;
        console.log(val);
        this.newsList[this.currentIndex].newsIntro = val.newsIntro;
        this.newsList[this.currentIndex].toLink = val.toLink;
        this.newsList[this.currentIndex].imgUrl = val.imgUrl;
      },
      addSuccess(val) {
        this.addDialogVisible = false;
        this.getNews()
        this.initNewsInfo()
      },
      initNewsInfo() {
        this.addNewsInfo.newsIntro = '';
        this.addNewsInfo.imgUrl = '';
        this.addNewsInfo.toLink = '';
        this.addNewsInfo.valid = false;
      }
    },
    mounted() {
      this.getNews()
    },
    components: {
      NewsForm,
    }
  }
</script>

<style>
  .newsManage_container {
    padding: 8px 8px 8px 8px;
  }
</style>
