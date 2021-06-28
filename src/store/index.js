import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            finished:[],
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state,data) {
            state.list[data.idx] = data.task
        },
        updateTasks(state, tasks) {
            console.log(tasks);
            state.list = tasks
        },
        deleteTask(state, idx) {
            state.list.splice(idx, 1);
        },
        finishTask(state,idx){
            state.finished.push(state.list[idx])
            state.list.splice(idx, 1);
        },
        unFinishTask(state,idx){
            state.list.unshift(state.finished[idx])
            state.finished.splice(idx, 1);
        },
        updateUnfinishTasks(state, tasks) {
            console.log(tasks);
            state.finished = tasks
        },
    }
});

export default store;