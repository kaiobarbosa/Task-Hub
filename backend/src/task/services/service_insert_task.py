def task_sctructure_insert(data):

    task = {
        "id_user": data.get("id_user"),
        "name": data.get("name"),
        "description": data.get("description")
    }
    
    return task