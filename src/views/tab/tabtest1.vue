<!--  -->
<template>
  <div class="">
    <el-tabs v-model="activeName">
      <el-tab-pane label="用户管理" name="first" disabled>
        用户管理
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second" disabled>
        配置管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third" disabled>
        角色管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth" disabled>
        定时任务补偿
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first'
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    handleBtnClick() {
      if (this.activeName === 'first') {
        this.activeName = 'second'
      } else if (this.activeName === 'second') {
        this.activeName = 'third'
      } else if (this.activeName === 'third') {
        this.activeName = 'fourth'
      }
    },
    handleBtnClickOld() {
      if (this.activeName === 'fourth') {
        this.activeName = 'third'
      } else if (this.activeName === 'third') {
        this.activeName = 'second'
      } else if (this.activeName === 'second') {
        this.activeName = 'first'
      }
    },
    handleBtnClickOldOther() {
      switch (this.activeName) {
        case 'fourth':
          this.activeName = 'third'
          break
        case 'third':
          this.activeName = 'second'
          break
        case 'second':
          this.activeName = 'first'
          break
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
