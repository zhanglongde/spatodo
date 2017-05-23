<template>
  <div>
    <header>todos</header>
    <input type="text" class="fm_new" placeholder="添加一个任务..." v-model="todo_new" v-on:keyup.enter="addTodo()">

    <section class="ctrl">
      <span class="tip">{{ leftCount }}项剩余</span>
      <span class="type" v-bind:class="{on: type == 'all'}" v-on:click="changeType('all')">全部</span>
      <span class="type" v-bind:class="{on: type == 'active'}" v-on:click="changeType('active')">未完成</span>
      <span class="type" v-bind:class="{on: type == 'completed'}" v-on:click="changeType('completed')">已完成</span>
      <span class="clear_all" v-on:click="clearCompleted()">清除已完成</span>
    </section>

    <section class="main">
      <div class="item" v-for="(item, $index) in filterList" v-bind:class="{finish: item.status == 1}">
        <span v-on:click="toggleTodo($index)"></span>
        <p>
          <i v-time="item.time"></i>
          {{ item.title }}
        </p>
        <em v-on:click="removeTodo(item)"></em>
      </div>
    </section>

  </div>
</template>

<script>
  import {util} from '../utils'
  var filters = {
    all: function(list) {
      return list;
    },
    active: function(list) {
      return list.filter(function (todo) {
        return !todo.status;
      });
    },
    completed: function(list) {
      return list.filter(function (todo) {
        return todo.status;
      });
    }
  };

export default {
  name: 'Todo',
  data () {
    return {
      type: 'all',
      list: JSON.parse(localStorage.getItem('list')) || [],
      todo_new: ''
    }
  },
  computed: {
    leftCount: function() {
      var count = 0;
      for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].status == 0) {
          count += 1;
        }
      }
      return count;
    },
    filterList: function () {
      return filters[this.type](this.list);
    }
  },
  methods: {
    addTodo: function() {
      var data = {
        title: this.todo_new,
        status: 0,
        time: util.time.getUnix('s')
      };

      this.list.push(data);
      this.todo_new = '';
    },
    toggleTodo: function(index) {
      this.filterList[index].status = (this.filterList[index].status) ? 0: 1;
    },
    removeTodo: function(item) {
      let index = this.list.findIndex(x=>x.time === item.time)
      this.list.splice(index,1)
    },
    clearCompleted: function() {
      this.list = filters.active(this.list);
    },
    changeType: function(type) {
      this.type = type;
    }
  },
  watch: {
    list: {
      handler: function(list) {
        localStorage.setItem('list', JSON.stringify(list));
      },
      deep: true
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  body{
    background: #b5CAA0;
    color: #666;
    -webkit-font-smoothing: antialiased;
  }
  header{
    font-size: 40px;
    color: #405B55;
    text-align: center;
    margin-top: 50px;
  }
  input{
    display: block;
    outline: none;
    border: none;
    color: #666;
  }
  .fm_new{
    width: 500px;
    height: 40px;
    padding: 0 10px;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    margin: 20px auto 0;
    font-size: 18px;
  }

  .main{
    width: 500px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    border-radius: 3px;
    padding: 0 10px;
    margin: 20px auto 0;
  }
  .item{
    height: 50px;
    line-height: 50px;
    position: relative;
    border-bottom: 1px solid #f2f2f2;
  }
  .item:last-child{
    border-bottom: none;
  }
  .item:after{
    content: '';
    display: block;
    clear: both;
  }
  .item span{
    display: block;
    width: 20px;
    height: 20px;
    border: 1px solid #dce0e3;
    background-color: #fff;
    border-radius: 100%;
    margin-right: 5px;
    position: relative;
    top: 13px;
    float: left;
  }
  .item.finish span:after{
    content: '';
    width: 16px;
    height: 16px;
    position: absolute;
    top: 2px;
    left: 2px;
    background-color: #0099e5;
    border-radius: 100%;
  }
  .item p{
    height: 25px;
    float: left;
    margin-left: 10px;
  }
  .item.finish p{
    text-decoration: line-through;
    color: #ddd;
  }
  .item p i{
    font-size: 12px;
    font-style: normal;
    color: #999;
    position: relative;
    top: -2px;
  }
  .item em{
    width: 30px;
    height: 30px;
    float: right;
    cursor: pointer;
    display: none;
    position: relative;
    top: 10px;
  }
  .item:hover em{
    display: block;
  }
  .item em:before,.item em:after{
    content: '';
    display: block;
    width: 15px;
    height: 1px;
    background: #cc9a9a;
    position: relative;
    /*top: 13px;*/
    top:50%;
    transform: translateY(-50%);
  }
  .item em:before{
    transform: rotate(45deg);
  }
  .item em:after{
    transform: rotate(-45deg);
  }
  .ctrl{
    width: 500px;
    text-align: center;
    margin: 20px auto 0;
    font-size: 14px;
  }
  .ctrl .tip{
    float: left;
  }
  .ctrl .type{
    display: inline-block;
    cursor: pointer;
    margin: 0 4px;
  }
  .ctrl .type.on{
    color: #0099e5;
  }
  .ctrl .clear_all{
    float: right;
    cursor: pointer;
  }
</style>
