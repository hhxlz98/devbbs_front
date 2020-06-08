<template>
  <el-form ref="newsInfo" :model="newsInfo" :rules="newsRules"
  size="mini" label-width="80px" label-position="left">
    <el-form-item label="广告描述" prop="newsIntro">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入内容"
        v-model="newsInfo.newsIntro">
        </el-input>
    </el-form-item>
    <el-form-item label="广告图片" prop="imgUrl">
      <el-input
        placeholder="广告图片链接"
        v-model="newsInfo.imgUrl"
        :readonly="true">
        <template slot="append">
          <el-upload
            class="upload-demo"
            action="http://localhost:9091/upload/newsImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <el-button size="medium" type="text" icon="el-icon-upload"></el-button>
          </el-upload>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="广告链接" prop="toLink">
      <el-input
        type="textarea"
        autosize
        placeholder="请输入广告链接"
        v-model="newsInfo.toLink">
      </el-input>
    </el-form-item>
    <el-form-item label="是否启用" v-if="isAdd">
      <el-checkbox v-model="newsInfo.valid">启用</el-checkbox>
    </el-form-item>
    <el-form-item style="text-align: center;">
      <el-button type="primary" size="mini" @click="clickSubmintNewsBtn">提 交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { updateNews } from '@/api'
  import { addNews } from '@/api'
  export default {
    data() {
      return {
        newsInfo: {
          newsId: 0,
          newsIntro: '',
          imgUrl: '',
          toLink: '',
          valid: false,
        },
        newsRules: {
          newsIntro: [
            {required: true, message: '请输入广告描述', trigger: 'blur'},
            {min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur'}
          ],
          imgUrl: [
            {required: true, message: '请上传广告图片', trigger: 'focus'}
          ],
          toLink: [
            {required: true, message: '请输入广告链接', trigger: 'blur'}
          ],
        },
      }
    },
    props:['isAdd', 'info'],
    watch: {
      info: function(val) {
        console.log("change");
        this.newsInfo = val;
      },
      deep: true
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.newsInfo.imgUrl = res.info;
      },
      clickSubmintNewsBtn() {
        this.$refs["newsInfo"].validate((valid) => {
          if (valid) {
            if (this.isAdd) {
              this.toAddNews()
            } else {
              this.toUpdateNews()
            }
          } else {
            return false;
          }
        });
      },
      toUpdateNews() {
        updateNews(this.newsInfo.newsId, this.newsInfo.newsIntro, this.newsInfo.imgUrl, this.newsInfo.toLink).then(response => {
          const data = response.data;
          if (data.code == '1202') {
            this.$message.success('更新成功'),
            this.$emit("update-success", this.newsInfo);
          }
        })
      },
      toAddNews() {
        addNews(this.newsInfo.newsIntro, this.newsInfo.imgUrl, this.newsInfo.toLink, this.newsInfo.valid).then(response => {
          const data = response.data;
          if (data.code == '1201') {
            this.$message.success('添加成功'),
            this.$emit("add-success", this.newsInfo);
          }
        })
      },
    },
    mounted() {
      this.newsInfo = this.info;
    }


  }

</script>

<style>
</style>
