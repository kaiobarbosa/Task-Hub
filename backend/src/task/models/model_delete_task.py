def task_model_delete(data):

    task_sql = "delete from task where id_task = %s;"

    task_values = (
            data.get("id_task"), 
        )
    
    return task_sql, task_values