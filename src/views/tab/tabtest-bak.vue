<!--  -->
<template>
  <div class="arrowTabContainer">
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
      <el-tab-pane label="用户管理" name="fourth" disabled>
        用户管理
        <el-button type="primary" @click="handleBtnClickOldOther">上一步</el-button>
        <el-button type="primary" @click="handleBtnClick">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fifth" disabled>
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
      } else if (this.activeName === 'fourth') {
        this.activeName = 'fifth'
      }
    },
    handleBtnClickOld() {
      if (this.activeName === 'fifth') {
        this.activeName = 'fourth'
      } else if (this.activeName === 'fourth') {
        this.activeName = 'third'
      } else if (this.activeName === 'third') {
        this.activeName = 'second'
      } else if (this.activeName === 'second') {
        this.activeName = 'first'
      }
    },
    handleBtnClickOldOther() {
      switch (this.activeName) {
        case 'fifth':
          this.activeName = 'fourth'
          break
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
.arrowTabContainer .el-tabs .el-tabs__nav {
	display: -webkit-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;
	width: 100%;
}

.arrowTabContainer .el-tabs .el-tabs__item {
	-webkit-box-flex: 1;
	-webkit-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: center;
	background-color: #34b8e2;
	color: #fff;
	position: relative;
	overflow: visible;
}

.arrowTabContainer .el-tabs .el-tabs__active-bar {
  display: none;
}

.arrowTabContainer .el-tabs .el-tabs__item.is-active::after {
	right: 0;
	border-color: transparent transparent transparent #34b8e2;
}

.arrowTabContainer .el-tabs .el-tabs__item::after {
	border-color: transparent transparent transparent #34b8e2;
	right: 3px;
}

.arrowTabContainer .el-tabs .el-tabs__item::after, .arrowTabContainer .el-tabs .el-tabs__item::before {
	display: block;
	content: "";
	height: 42px;
	border-width: 21px 0 21px 21px;
	border-style: dashed none dashed solid;
	position: absolute;
	top: 0;
}

.arrowTabContainer .el-tabs .el-tabs__item.is-active::before {
	width: 21px;
	height: 42px;
	background-color: #eee;
	border: none;
}

.arrowTabContainer .el-tabs .el-tabs__item::before {
	border-color: transparent transparent transparent #fff;
	right: 0;
}

::selection {
	background: #34b8e2;
	color: #fff;
}
.arrowTabContainer .el-tabs.fourItem .el-tabs__item {
	width: 25%;
}

.arrowTabContainer .el-tabs .el-tabs__item.is-active {
	color: #fff;
}

.arrowTabContainer .el-tabs .el-tabs__item {
	padding: 0 20px;
	font-size: 14px;
}

.arrowTabContainer .el-tabs .el-tabs__item.is-active ~ .el-tabs__item.is-disabled { // #b~p，匹配所有在#b元素之后的同级p元素。
	background-color: #eee;
	color: #bbb;
}
.arrowTabContainer .el-tabs .el-tabs__item.is-active ~ .el-tabs__item.is-disabled::after {
	border-color: transparent transparent transparent #eee;
}
.arrowTabContainer .el-tabs .el-tabs__item.is-active:last-child::after, .arrowTabContainer .el-tabs .el-tabs__item.is-active:last-child::before {
	display: none;
}
.arrowTabContainer .el-tabs .el-tabs__item.is-active ~ .el-tabs__item.is-disabled:last-child::before {
	display: none;
}

</style>
