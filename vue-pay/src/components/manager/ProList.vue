<template>
  <div>
    <el-button type="primary"  @click="handleCurrentChange(1)">初始化列表</el-button>
    <el-table
      :data="tempList.filter(data => !search || data.proName.toLowerCase().includes(search.toLowerCase())|| data.proId.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      :default-sort="{prop: 'proId'}"
    >
<!--   全选框   -->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="proId"
        label="商品id"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="proName"
        label="商品名称"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户id"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column
        prop="proDelete"
        label="状态"
        width="180"
        sortable>
      </el-table-column>
      <el-table-column label="操作">>
        <template slot-scope="scope">
          <el-button type="success"
                     slot="reference"
                     size="mini"
                     @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-dialog title="商品信息" :visible.sync="editFormVisible">
            <el-form :model="form" ref="editForm">
              <el-form-item label="商品id" :label-width="formLabelWidth">
                <el-input v-model="form.proId" autocomplete="off" readonly></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.proName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户id" :label-width="formLabelWidth">
                <el-input v-model="form.userId" autocomplete="off" ></el-input>
              </el-form-item>
              <el-form-item label="是否删除" :label-width="formLabelWidth">
                <el-input v-model="form.proDelete" autocomplete="off" readonly></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitEdit()">提交修改</el-button>
            </div>
          </el-dialog>

          <template>
            <el-popconfirm
              confirmButtonText='确定'
              cancelButtonText='取消'
              icon="el-icon-info"
              iconColor="red"
              title="确定删除吗？"
              @onConfirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference"
                         size="mini"
                         type="danger"
                         >删除
              </el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
      </el-table-column>
<!--   新建商品   -->
      <el-table-column>
        <template slot="header" slot-scope="scope">
            <el-button type="success"
                       slot="reference"
                       size="mini"
                       @click="openNew()">新建</el-button>
            <el-dialog title="商品信息" :visible.sync="newFormVisible">
              <el-form :model="newForm" ref="newForm">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input v-model="newForm.proName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户id" :label-width="formLabelWidth">
                  <el-input v-model="newForm.userId" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="newFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitNew()">提交</el-button>
              </div>
            </el-dialog>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="proList.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProListPage from "./ProListPage";



export default {
  name: "ProInfo",
  components: {ProListPage},
  beforeRouteEnter: (to, from, next) => {
    console.log("准备进入商品列表页");
    next(
      console.log(`进入到目标页面之后调用的函数`),
    );
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开商品列表页");
    next(
      console.log("离开后")
    );
  },
  data() {
    return {
      proList: [
      ],
      currentPage:1,
      pageSize:10,
      search: '',
      form:{
        proId:'',
        proName:'',
        userId:'',
        proDelete:''
      },
      newForm:{
        proName:'',
        userId:''
      },
      formLabelWidth: '120px',
      editFormVisible: false,
      newFormVisible: false,
      tempList:[]
    }
  },
  created() {
    // console.log('初始化')
    // // this.handleCurrentChange(this.currentPage)
    // console.log(`当前页: ${this.currentPage}`);
    // console.log(this.pageSize)
    // this.getList()
    // console.log('商品列表')
    // console.log(this.proList)
    // console.log('临时列表')
    // console.log(this.tempList)
    // this.currentChangePage(this.proList,this.currentPage)
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
      this.editFormVisible = true
     //console.log(index, row);
      this.form=row

    },
    handleDelete(index, row) {
      const that=this
      console.log(row.proId);
      console.log("删除")
      const params = new URLSearchParams();
      params.append('proId', row.proId)
      axios.post('http://localhost:8888/pro/delete', params).then(function (resp) {
        console.log(resp.data)
        if (resp.data.flag)
        {
          that.successDel()
        }else {
          that.failDel()
        }
        that.getList()
        that.currentChangePage(that.proList,that.currentPage)
      })

    },
    openNew(){
      this.newFormVisible = true
    },
    submitEdit(){
      this.editFormVisible = false
      const that=this
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          console.log("修改")
          const params = new URLSearchParams();
          params.append('proId', this.form.proId)
          params.append('proName', this.form.proName)
          params.append('userId', this.form.userId)
          params.append('proDelete', this.form.proDelete)
          axios.post('http://localhost:8888/pro/update', params).then(function (resp) {
            console.log(resp.data)
            that.$refs["editForm"].resetFields()
            that.$refs["editForm"].clearValidate()
            if (resp.data.flag)
            {that.successUp()
            }else {
              that.failUp()
            }
        that.getList()
            that.currentChangePage(that.proList,that.currentPage)
          })
        }
      })
    },
    submitNew(){
      this.newFormVisible = false
      const that=this
      this.$refs["newForm"].validate((valid) => {
        if (valid) {
          console.log("新建")
          const params = new URLSearchParams();
          params.append('proName', this.newForm.proName)
          params.append('userId', this.newForm.userId)
          axios.post('http://localhost:8888/pro/new', params).then(function (resp) {
            console.log(resp.data)
            that.$refs["newForm"].resetFields()
            that.$refs["newForm"].clearValidate()
            if (resp.data.flag)
            {that.successNew()
            }else {
              that.failNew()
            }
            that.getList()
            that.currentChangePage(that.proList,that.currentPage)
          })
        }
      })
    },
    getList() {
      const that = this
      axios.post('http://localhost:8888/pro/getList').then(function (resp) {
        //console.log(resp.data.data)
        that.proList = resp.data.data
        //console.log('ok')
      })
    },
    successUp() {
      const h = this.$createElement;
      this.$notify({
        title: '恭喜',
        message: '修改成功',
        type: 'success'
      });
    },
    successDel() {
      const h = this.$createElement;
      this.$notify({
        title: '恭喜',
        message: '删除成功',
        type: 'success'
      });
    },
    successNew() {
      const h = this.$createElement;
      this.$notify({
        title: '恭喜',
        message: '新建成功',
        type: 'success'
      });
    },
    failUp() {
      const h = this.$createElement;
      this.$notify({
        title: '抱歉',
        message: '修改失败',
        type: 'fail'
      });
    },
    failDel() {
      const h = this.$createElement;
      this.$notify({
        title: '抱歉',
        message: '删除失败',
        type: 'fail'
      });
    },
    failNew() {
      const h = this.$createElement;
      this.$notify({
        title: '抱歉',
        message: '新建失败',
        type: 'fail'
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      console.log(this.pageSize)
      this.getList()
      console.log('商品列表')
      console.log(this.proList)
      this.currentChangePage(this.proList,val)
      console.log('临时列表')
      console.log(this.tempList)
    },
    currentChangePage(list,currentPage) {
      let from = (currentPage - 1) * this.pageSize;
      let to = currentPage * this.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
