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
      @transitionEnd="onTransitionEnd"
      @tap="onTap"
    >
      <swiper-slide v-if="task.status === 'INCOMPLETE'" class="complete-slide"
        >完成</swiper-slide
      >
      <swiper-slide
        v-else-if="task.status === 'COMPLETED'"
        class="left-incomplete-slide"
        >取消完成</swiper-slide
      >
      <swiper-slide>{{ task.content }}</swiper-slide>
      <swiper-slide v-if="task.status === 'INCOMPLETE'" class="delete-slide"
        >删除</swiper-slide
      >
      <swiper-slide
        v-else-if="task.status === 'COMPLETED'"
        class="right-incomplete-slide"
        >取消完成</swiper-slide
      >
    </swiper>
  </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit, ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";

const props = defineProps({
  taskIndex: Number,
  task: Object,
});

const emit = defineEmit(["delete", "complete", "edit", "InComplete"]);

const onTransitionEnd = (instance) => {
  const { activeIndex } = instance;
  switch (props.task.status) {
    case "INCOMPLETE":
      if (activeIndex === 0) {
        emit("complete");
        instance.destroy();
      } else if (activeIndex === 2) {
        emit("delete");
        instance.destroy();
      }
      break;
    case "COMPLETED":
      if (activeIndex === 0 || activeIndex === 2) {
        emit("InComplete");
        instance.destroy();
      }
      break;
  }
};

const onTap = (instance) => {
  emit("edit");
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

  & .complete-slide {
    color: white;
    background: #0099ff;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 8px;
  }

  & .delete-slide {
    color: white;
    background: tomato;
    padding-left: 8px;
    justify-content: flex-start;
    box-sizing: border-box;
  }

  & .left-incomplete-slide {
    color: white;
    background: #00cc66;
    justify-content: flex-end;
    box-sizing: border-box;
    padding-right: 8px;
  }

  & .right-incomplete-slide {
    color: white;
    background: #00cc66;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-left: 8px;
  }
}

.task-item-wrapper:not(:last-child) {
  border-bottom: none !important;
}
</style>