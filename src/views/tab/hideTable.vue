<template>
  <div class="app-container">
    <!--列表-->
    <el-table v-loading="loading" :data="service" highlight-current-row border fit stripe @selection-change="selsChange">
      <el-table-column prop="serviceId" label="ID" sortable align="center"/>
      <el-table-column prop="serviceName" label="名称" sortable align="center"/>
      <el-table-column label="内容" align="center">
        <template slot-scope="scope">
          <show-more :show-height="showHeight" :content="scope.row.content"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center">
        <template slot-scope="scope" >
          <el-switch
            v-model="scope.row.seeActive"
            :active-value="activeValue"
            :inactive-value= "inactiveValue"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="handleChangeStatus(scope.$index, scope.row)"/>
        </template>
      </el-table-column> -->
    </el-table>

    <!--工具条-->
    <el-col v-if="showFlag" :span="24" class="toolbar toolbar-container">
      <el-pagination
        :total="total"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageSize"
        style="float:right;"
        layout="total, sizes, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="changePageSize"/>
    </el-col>
  </div>
</template>

<script>
import { getServiceGrid, changeServiceStatus } from '@/api/systemManage'
import showMore from './components/showMore'
export default {
  components: { showMore },
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: '已启用',
        0: '已禁用'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      loading: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      sels: [], // 列表选中列
      service: [
        { serviceId: 1, serviceName: '中国工商银行', content: '中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行中国工商银行' },
        { serviceId: 2, serviceName: '中国农业银行', content: '中国农业银行中国农业银行' },
        { serviceId: 3, serviceName: '中国建设银行', content: '中国建设银行中国建设银行中国建设银行中国建设银行' },
        { serviceId: 4, serviceName: '招商银行', content: '招商银行招商银行' },
        { serviceId: 5, serviceName: '成都银行', content: '成都银行' }
      ],
      serviceText: '',
      activeValue: 1,
      inactiveValue: 0,
      showHeight: 25
    }
  },
  computed: {
    showFlag() {
      return this.total > 10
    }
  },
  mounted() {
  },
  methods: {
    // 改变页面
    handleCurrentChange(val) {
      this.pageNum = val
      this.handleGetService()
    },

    // 获取选中的行
    selsChange: function(sels) {
      this.sels = sels
    },

    reverseStatus: function(number) {
      if (number) {
        return 0
      } else {
        return 1
      }
    },

    changePageSize: function(size) {
      this.pageSize = size
      this.handleGetService()
    },

    handleChangeStatus: function(index, row) {
      const status = this.reverseStatus(row.seeActive)
      const para = {
        seeId: row.seeId,
        seeActive: row.seeActive
      }
      changeServiceStatus(para).then(res => {
        // this.handleGetService()
      }).catch(res => {
        row.seeActive = status
      })
    },

    handleGetService: function() {
      this.loading = true
      const para = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getServiceGrid(para).then(res => {
        this.service = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    },

    handleFilter: function() {
      this.loading = true
      const para = {
        seeText: this.serviceText,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      getServiceGrid(para).then(res => {
        this.service = res.data.list
        this.total = res.data.total
        this.loading = false
      }).catch(res => {
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>
  .toolbar-container{
    padding-top: 30px;
    padding-bottom: 50px;
    padding-right: 100px;
  }
</style>
