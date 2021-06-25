<template>
    <n-list-item class="task-item-wrapper">
        <template #prefix>
            <n-icon size="16">
                <drag-indicator-outlined />
            </n-icon>
        </template>
        <swiper
            :initial-slide="1"
            :slides-per-view="1"
            :resistance-ratio="0.75"
            :speed="200"
            @reachBeginning="onReachBeginning"
            @reachEnd="onReachEnd"
            @click="showModal = true"
        >
            <swiper-slide class="finish-slide">完成</swiper-slide>
            <swiper-slide>{{ task.content }}</swiper-slide>
            <swiper-slide class="delete-slide">删除</swiper-slide>
        </swiper>
    </n-list-item>

    <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="Dialog"
        :show-icon="false"
    >
        <template #header>
            <div>任务详情</div>
        </template>
        <div>
            <n-input
                v-model:value="task.content"
                type="input"
                placeholder="请填写任务信息..."
            />
        </div>

        <template #action>
            <n-button  @click="">提交</n-button>
        </template>
    </n-modal>

</template>

<script setup>
import { defineProps, defineEmit,ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { NListItem, NIcon,NInput,NButton,NModal} from "naive-ui";
import { DragIndicatorOutlined } from "@vicons/material";

const props = defineProps({
    task: Object,
    taskIndex: Number,
    __proto__: Object,
});

const emit = defineEmit(["delete","finish"]);

let showModal = ref(false)

const onReachBeginning = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 1) {
        emit("finish");
        // instance.destory();
    }
};

const onReachEnd = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 1) {
        emit("delete");
        // instance.destory();
    }
};

const onClick = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 1) {
        emit("tap");
        // instance.destory();
    }
};

</script>

<style lang="postcss">
.task-item-wrapper {
    padding: 0 !important;
    border: 1px solid var(--merged-border-color);
    cursor: move;

    & .n-list-item__prefix {
        margin: 0px !important;
        padding: 8px;
        display: flex;
    }

    & .swiper-container {
        width: 100%;
        height: 100%;
        cursor: default;
    }

    & .swiper-slide {
        padding: 8px 0;
        display: flex;
        align-items: center;
        width: 100% !important;
    }

    & .finish-slide {
        color: white;
        background: #0099FF;
        justify-content: flex-start;
        text-align:right;
    }

    & .delete-slide {
        color: white;
        background: tomato;
        padding-left: 16px;
        justify-content: flex-start;
    }
}

.task-item-wrapper:not(:last-child) {
    border-bottom: none !important;
}

</style>