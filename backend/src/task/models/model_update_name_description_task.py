def task_model_update_name_description(data):

    task_sql = "update task set name_task = %s, description_task = %s where id_task = %s;"

    task_values = (
        data.get("new_name"),
        data.get("new_description"),
        data.get("id_task")
    )

    return task_sql, task_values