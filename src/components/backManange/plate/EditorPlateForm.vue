<template>
  <el-form ref="plateInfo" :model="plateInfo" :rules="rules" :size="size" label-position="top" v-loading="loading">
    <el-form-item label="板块名称" prop="plateName">
        <el-input v-model="plateInfo.plateName" placeholder="请输入板块名" :readonly="plateNameEditable"></el-input>
    </el-form-item>
    <el-form-item label="板块图片" prop="imgUrl">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:9091/upload/plateImg"
          :data="{plateName: plateInfo.plateName}"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="plateInfo.imgUrl" :src="CommonUtil.baseUrl + plateInfo.imgUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>
    <el-form-item label="板块简介" prop="plateIntro">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4}"
          placeholder="请输入板块简介"
          v-model="plateInfo.plateIntro"
           maxlength="100"
            show-word-limit>
        </el-input>
    </el-form-item>
     <el-form-item style="text-align:center">
        <el-button type="primary" @click="submitForm('plateInfo')">提交</el-button>
      </el-form-item>
  </el-form>
</template>

<script>
  import { plateNameExist } from '@/api'
  import { updatePlateInfo } from '@/api'
  import { addNewPlate } from '@/api'
  export default {
    data() {
      var validatePlateName = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('板块名不能为空'));
              } else {
                console.log(value, this.plateInfo.plateId);
                plateNameExist(this.plateInfo.plateId, value).then(response => {
                  const exist = response.data;
                  if (exist) {
                     callback(new Error('板块名已存在'));
                  } else {
                     callback()
                  }
                })
              }
            };
      return {
        loading: false,
        rules: {
          plateName: [
            {required: true, message: '请输入板块名称', trigger: 'blur'},
            {min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'blur'},
            { validator: validatePlateName, trigger: 'blur' }
          ],
          plateIntro: [
            {required: true, message: '请输入板块简介', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ]
        },
        // info: {
        //   plateName: '',
        //   plateIntro: '',
        //   imgUrl: '',
        // },
      }
    },
    props: ['plateInfo', 'size', 'plateNameEditable', 'userId'],
    methods: {
      handleAvatarSuccess(res, file) {
        this.plateInfo.imgUrl = res.info;
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG) {
          this.$message.error('上传头像图片只能是 JPG 格式或 PNG 格式!');
          return false;
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
          return false;
        }
        return true;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postPlatInfo()
          } else {
            return false;
          }
        });
      },
      postPlatInfo(){
        this.loading = true;
        if (this.plateInfo.plateId > 0) {
          updatePlateInfo(this.userId, this.plateInfo.plateId, this.plateInfo.plateName, this.plateInfo.plateIntro, this.plateInfo.imgUrl).then(response => {
            const data = response.data;
            if (data.code == '203') {
              this.$message.success("版块信息已更新");
              this.$emit("update-success");
            } else if (data.code == '202') {
              this.$message.error("版块名重复，更新失败");
            }
            else {
              this.$message.error("更新失败");
            }
            this.loading = false;
          })
        } else {
          addNewPlate(this.userId, this.plateInfo.plateName, this.plateInfo.plateIntro, this.plateInfo.imgUrl).then(response => {
            const data = response.data;
            if (data.code == '206') {
              this.$message.success("创建成功");
              this.$emit("add-success");
            } else if (data.code == '202') {
              this.$message.error("版块名重复，创建失败");
            } else {
              this.$message.error("创建失败");
            }
            this.loading = false;
          })
        }
      },
    },
    components: {

    },
  }
</script>

<style scoped>
    .avatar-uploader{
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      width: 178px;
      height: 178px;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
