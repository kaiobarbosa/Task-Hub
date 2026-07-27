def task_model_insert(data):

    task_sql = "insert into task (id_user, name_task, description_task) values(%s, %s, %s);"

    task_values = (
            data.get("id_user"), 
            data.get("name"), 
            data.get("description")
        )
    
    return task_sql, task_values