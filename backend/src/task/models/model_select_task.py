def task_model_select():

    task_sql = "SELECT * FROM task WHERE id_user = %s"
    
    return task_sql