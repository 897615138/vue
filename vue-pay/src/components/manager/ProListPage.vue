<template>
  <div>
<!--    <div class="block">-->
<!--      <span class="demonstration">显示总数</span>-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page.sync="currentPage1"-->
<!--        :page-size="100"-->
<!--        layout="total, prev, pager, next"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--    <div class="block">-->
<!--      <span class="demonstration">调整每页显示条数</span>-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page.sync="currentPage2"-->
<!--        :page-sizes="[100, 200, 300, 400]"-->
<!--        :page-size="100"-->
<!--        layout="sizes, prev, pager, next"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
<!--    </div>-->
<!--    <div class="block">-->
<!--      <span class="demonstration">直接前往</span>-->
<!--      <el-pagination-->
<!--        @size-change="handleSizeChange"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :current-page.sync="currentPage3"-->
<!--        :page-size="100"-->
<!--        layout="prev, pager, next, jumper"-->
<!--        :total="1000">-->
<!--      </el-pagination>-->
<!--    </div>-->
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
      // currentPage1: 5,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4
    };
  }
}
</script>
