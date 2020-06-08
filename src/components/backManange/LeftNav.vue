<template>
  <el-menu :default-active="$route.path" router background-color="#545c64" text-color="#fff"
           active-text-color="#ffd04b">
    <template v-for="(issue, index) in $router.options.routes">
      <template v-if="issue.name === 'backManage'">
        <template v-for="(item, index) in issue.children">
          <el-submenu :index="index + ' '" v-show="item.menuShow">
            <template slot="title"><i :class="item.icon" aria-hidden="true"></i><span slot="title">&nbsp;{{item.name}}</span></template>
            <el-menu-item v-for="term in item.children" :key="term.path" v-show="term.menuShow"
                          :index="term.path" :class="$route.path===term.path? 'is-active' : ''">
              <span slot="title">{{term.name}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </template>
    </template>

  </el-menu>

</template>


<script>
</script>

<style>

</style>
