<template>
  <div>
    <el-table
      :data="proList.filter(data => !search || data.proName.toLowerCase().includes(search.toLowerCase())|| data.proId.toLowerCase().includes(search.toLowerCase()))"
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
                <el-input v-model="form.proId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" :label-width="formLabelWidth">
                <el-input v-model="form.proName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户id" :label-width="formLabelWidth">
                <el-input v-model="form.userId" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="是否删除" :label-width="formLabelWidth">
                <el-input v-model="form.proDelete" autocomplete="off"></el-input>
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
            >
              <el-button slot="reference"
                         size="mini"
                         type="danger"
                         @click="handleDelete(scope.$index, scope.row)">删除
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
              <el-form :model="newForm">
                <el-form-item label="商品id" :label-width="formLabelWidth">
                  <el-input v-model="newForm.proId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                  <el-input v-model="newForm.proName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户id" :label-width="formLabelWidth">
                  <el-input v-model="newForm.userId" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editFormVisible = false">提交</el-button>
              </div>
            </el-dialog>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
import axios from "axios";


export default {
  name: "ProInfo",
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
      search: '',
      form:{
        proId:'',
        proName:'',
        userId:'',
        proDelete:''
      },
      newForm:{
        proId:'',
        proName:'',
        userId:'',
        proDelete:''
      },
      formLabelWidth: '120px',
      editFormVisible: false,
      newFormVisible: false,
    }
  },
  created() {
    this.getList()
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
      console.log(index, row);
    },
    openNew(){
      this.newFormVisible = true
    },
    submitEdit(){
      this.editFormVisible = false
      const that=this
      this.$refs["editForm"].validate((valid) => {
        if (valid) {
          console.log("注册")
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
    failUp() {
      const h = this.$createElement;
      this.$notify({
        title: '抱歉',
        message: '修改失败',
        type: 'fail'
      });
    }
  }
}
</script>

<style scoped>
</style>
