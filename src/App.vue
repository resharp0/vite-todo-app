<template>
    <div id="app">
        <n-layout>
            <n-layout-header>
                <h1>mini TO-DO</h1>
                <n-button>
                    <router-link to="/">主页</router-link>
                </n-button>
                <n-button>
                    <router-link to="/archive">归档页</router-link>
                </n-button>
            </n-layout-header>
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script setup>
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NGrid,
    NH1,
    NButton,
} from "naive-ui";
</script>

<style lang="postcss" scoped>
#app {
    background: #f5f5f5;

    & .n-layout-header {
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }

    & .n-layout-content {
        margin:  auto;
        padding: 16px;
        max-width: 360px;
        
    }
}
</style>
