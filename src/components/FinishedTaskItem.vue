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
            :resistance-ratio="0"
            :speed="200"
            @reachBeginning="onReachBeginning"
            @reachEnd="onReachEnd"
        >
            <swiper-slide class="unfinish-slide">取消完成</swiper-slide>
            <swiper-slide>{{ task.content }}</swiper-slide>
            <swiper-slide class="unfinish-slide">取消完成</swiper-slide>
        </swiper>
    </n-list-item>

</template>

<script setup>

import { defineProps, defineEmit,ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { NListItem, NIcon,NInput,NButton,NModal } from "naive-ui";
import { DragIndicatorOutlined } from "@vicons/material";

const props = defineProps({
    task: Object,
    taskIndex: Number,
});

const emit = defineEmit(["unfinish"]);

const onReachBeginning = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 1) {
        emit("unfinish");
        // instance.destory();
    }
};

const onReachEnd = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 1) {
        emit("unfinish");
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

    & .unfinish-slide {
        color: white;
        background: #00FF00;
        justify-content: flex-start;
        text-align:right;
    }

}

.task-item-wrapper:not(:last-child) {
    border-bottom: none !important;
}

</style>
