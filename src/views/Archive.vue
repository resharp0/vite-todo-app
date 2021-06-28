<template>
  <n-h1>Archive List</n-h1>
  <n-space vertical>
    <n-list v-if="finished.length">
      <draggable
        :list="finished"
        @start="drag = true"
        @end="drag = false"
        item-key="id"
      >
        <template #item="{ index, element }">
          <finished-task-item
            :key="element.id"
            :taskIndex="index"
            :task="element"
            @unfinish="() => onUnfinish(index)"
            @edit="() => onEdit(index, element)"
          />
        </template>
      </draggable>
    </n-list>
    <n-thing v-else> 还没有任务被完成 </n-thing>
  </n-space>

  <n-modal
    v-model:show="showEditModal"
    preset="dialog"
    title="Dialog"
    :show-icon="false"
  >
    <template #header>
      <div>任务详情</div>
    </template>
    <div>
      <n-input
        v-model:value="editContent"
        type="input"
        placeholder="请填写任务信息..."
      />
    </div>
    <template #action>
      <n-button @click="onUpdate">提交</n-button>
    </template>
  </n-modal>
</template>

<script setup>
import { NH1 } from "naive-ui";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  NList,
  NListItem,
  NButton,
  NSpace,
  NThing,
  NModal,
  NInput,
} from "naive-ui";
import FinishedTaskItem from "../components/FinishedTaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";

const store = useStore();
const finished = computed(() => store.state.finished);

let showEditModal = ref(false);
let editContent = ref("");
let editTaskIndex = ref(0);

const onUnfinish = (index) => {
  store.commit("unFinishTask", index);
};

const onEdit = (index, task) => {
  showEditModal.value = true;
  editTaskIndex.value = index;
  editContent.value = task.content;
};
const initTask = {
  id: "",
  content: "",
  status: "COMPLETE",
};

const onUpdate = () => {
  let task = {
    ...initTask,
    content: editContent.value,
  };
  store.commit("updateFinishedTask", {
    idx: editTaskIndex.value,
    task: task,
  });
  showEditModal.value = false;
};
</script>

<style scope>
.extra {
  display: flex;
  justify-content: center;
}
</style>
