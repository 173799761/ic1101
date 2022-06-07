/**
 * article模块接口列表
 */

import { get } from '@/utils/http'; // 导入http中创建的axios实例

const api = {
    /**
     * 登录
     * userName String
     */
    login(params) {
        return get(`/user_login`, params);
    },

    /**
     * 任务列表
     * userName String
     */
    userTasks(params){
        return get(`/ic_user_tasks`, params);
    },

    /**
     * 完成任务
     * userName String
     * taskId String
     */
    taskClaim(params){
        return get(`/ic_user_task_claim`, params);
    },

    /**
     * 平台状态
     */
    icStatus(){
        return get(`/ic_status`);
    },

    /**
     * 用户数据保存
     * userName String
     * saveType Int     1: 邮箱
     * saveData String
     */
    userSave(params){
        return get(`/ic_user_save`, params);
    },

    /**
     * 获取用户数据
     * userName String
     */
    userInfo(params){
        return get(`/ic_user_info`, params);
    },

    /**
     * 前100用户数据
     * curIdx Int
     * pageSize Int
     */
    userTop100(params){
        return get(`/ic_user_top_100`, params);
    },

    /**
     * 报名申请
     * userName String
     */
     userApply(params){
        return get(`/ic_user_apply`, params);
    },
}

export default api;