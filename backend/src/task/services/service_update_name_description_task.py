def task_sctructure_update_name_description(data):

    task = {
        "id_task": data.get("id_task"),
        "new_name": data.get("new_name"),
        "new_description": data.get("new_description")
    }
    
    return task