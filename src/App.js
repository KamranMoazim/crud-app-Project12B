import React, {useState,useEffect} from 'react';
import { Formik } from 'formik';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update'
import { Button } from '@material-ui/core';

export default function Home() {

    const [updatedText, setUpdatedText] = useState("")
    var [tasks, setTasks] = useState([]);
    const [USEffect, setUSEffect] = useState(true);
    const [updateID, setupdateID] = useState(0)


    // Read Tasks
    const readData = async () => {
        return await fetch(`/.netlify/functions/allTasks`)
            .then(res => res.json())
            .then((data) => {
                return data
            })
    }

    // Delete Tasks
    const deleteTodo = async (id) => {
        await fetch(`/.netlify/functions/delete`, {
            method: 'DELETE',
            body: JSON.stringify(id)
        })
            .then(res => res.json())
            .then((data) => {
                setUSEffect(!USEffect)
                return data
            })
            .catch(err => err)
    }


    useEffect(() => {
        const fetchData = async () => {
            const dataComing = await readData()
            setTasks(dataComing)
        }
        fetchData()
    }, [USEffect])
    
    
    // console.log(tasks);
    // console.log(updateID);
    // console.log(updatedText);


    return <div>
        <h1>CRUD APP!</h1>
        <Formik
            initialValues={{ message: "" }}
            validate={values => {
                const errors = {};
                if (!values.message) {
                    errors.message = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                console.log(values);
                fetch(`/.netlify/functions/add`, {
                            method: 'post',
                            body: JSON.stringify(values)
                        })
                .then(response => response.json())
                .then(data => {
                    setUSEffect(!USEffect)
                    values = ""
                    console.log(data);
                });

            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                        />
                        {errors.message && touched.message && errors.message}
                        <button type="submit">
                            Add Task
                        </button>
                    </form>
                )}
        </Formik>




        <h3>All Added Tasks</h3>
        {tasks.map( (task,id) => {
            return  (<div key={id}>
                <p >{task.data.message}
                <Button onClick={async () => {
                    await deleteTodo(task.ref['@ref'].id)  // const data = 
                    setUSEffect(!USEffect)
                }} >
                    <DeleteIcon />
                </Button>
                                                      
                <Button type='submit' onClick={() => {
                    setupdateID(task.ref['@ref'].id)
                    setUpdatedText(task.data.message)
                }}>
                    <UpdateIcon />
                </Button>
                </p> 
            </div>)
        })}




        <h3>Update Your Clicked Task!</h3>
        <h5>This task will updated</h5>
        <h5>{updatedText}</h5>
        <Formik
            initialValues={{ message: "" }}
            validate={values => {
                const errors = {};
                if (!values.message) {
                    errors.message = 'Required';
                }
                return errors;
            }}
            onSubmit={ (values, { setSubmitting }) => {
                console.log(values);
                fetch(`/.netlify/functions/update`, {
                            method: 'post',
                            body: JSON.stringify({values, updateID})
                        })
                .then(response => response.json())
                .then(data => {
                    setUSEffect(!USEffect)
                    setUpdatedText("")
                    setupdateID(0)
                });

            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
            }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="message"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.message}
                        />
                        {errors.message && touched.message && errors.message}
                        <button type="submit">
                            Update Task
                        </button>
                    </form>
                )}
        </Formik>
    </div>
}