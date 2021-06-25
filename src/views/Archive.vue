<template>
    <n-h1>Archive List</n-h1>
    <n-space vertical>
        <n-list v-if="finished.length">
            <draggable
                :list="finished"
                @change="dragList"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
            >
                <template #item="{ index, element }">
                    <finished-task-item
                        :taskIndex="index"
                        :task="element"
                        @unfinish="() => onUnfinish(index)"
                    />
                </template>
            </draggable>
        </n-list>
        <n-thing v-else> 还没有任务被完成 </n-thing>
    </n-space>
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

const dragList = (e) => {
    const { moved } = e;
    const { oldIndex, newIndex } = moved;
    const tasks = cloneDeep(finished);
    tasks.splice(oldIndex, newIndex, tasks[oldIndex]);
    store.commit("updateUnfinishTasks", tasks);
};

const onUnfinish = (index)  =>{
    store.commit("unFinishTask",index)
};

</script>

<style scope>

.extra {
    display: flex;
    justify-content: center;
}
</style>
