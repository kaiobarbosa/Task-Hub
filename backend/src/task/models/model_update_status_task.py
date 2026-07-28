def task_model_update_status(data):

    task_sql = "update task set status_task = %s where id_task = %s;"

    if data.get("statusChange"):
        task_values = ( 
                    "Concluido",
                    data.get("id_task") 
                )
    else:
        task_values = (
                        "Pendente",
                        data.get("id_task") 
                    )
    
    
    return task_sql, task_values