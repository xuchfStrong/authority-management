<!-- json to tree -->
<template>
  <div class="app-container">
    <el-table :data="dataList" border fit>
      <el-table-column prop="id" label="ID" sortable align="center"/>
      <el-table-column label="内容" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-tree
            :data="scope.row.content"
            :props="defaultProps"
            default-expand-all
            @node-click="handleNodeClick"/>
        </template>
      </el-table-column>
    </el-table>

    <el-tree
      :data="tData"
      :props="defaultProps"
      default-expand-all
      @node-click="handleNodeClick"/>
  </div>
</template>

<script>
import { getJsonData } from '@/api/login'
export default {

  components: {},
  data() {
    return {
      data: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tData: [],
      dataList: []
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.handleGetData()
  },

  methods: {
    handleNodeClick(data) {
    },
    async handleGetData() {
      const res = await getJsonData()
      this.tData = this.jsonToTree2(res.data)
      this.dataList.push({ id: 1, content: this.tData })
      // this.dataList.push({ id: 2, content: this.tData })
    },

    /**
     * 将json的数据解析成tree状，所有Array和object都解析成key为children的数据。
     * 将key和value组合成 "label": "key: vlaue"。
     * 这样在tree组件上直接展示label实际显示的就是"key: vlaue"
     */
    jsonToTree2(data) {
      const jsonData = []
      Object.keys(data).forEach(key => {
        if (typeof (data[key]) !== 'object') {
          const label = key.concat(': ').concat(data[key])
          jsonData.push({ 'label': label })
        } else if (Array.isArray(data[key])) {
          const label = key.concat(':')
          const children = []
          data[key].forEach((item, index) => {
            if (typeof (item) === 'object') {
              children.push({ 'label': index, 'children': this.jsonToTree2(item) })
            } else {
              children.push({ 'label': item })
            }
          })
          jsonData.push({ 'label': label, 'children': children })
        } else {
          const label = key.concat(':')
          const children = []
          let i
          for (i in data[key]) {
            if (typeof (data[key][i]) === 'object') {
              children.push({ 'label': i.concat(': '), 'children': this.jsonToTree2(data[key][i]) })
            } else {
              children.push({ 'label': i.concat(': ').concat(data[key][i]) })
            }
          }
          jsonData.push({ 'label': label, 'children': children })
        }
      })
      return jsonData
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
