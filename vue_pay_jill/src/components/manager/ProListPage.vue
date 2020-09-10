<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProListPage',
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.pageSize)
    }
  },
  data() {
    return {
      currentPage:1,
      pageSize:10
    };
  }
}
</script>
