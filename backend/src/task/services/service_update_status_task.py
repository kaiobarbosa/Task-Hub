def task_sctructure_update_status(data):

    task = {
        "id_task": data.get("id_task"),
        "statusChange": data.get("statusChange")
    }
    
    return task