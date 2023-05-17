import './App.css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { useState, useRef } from 'react';
import Weather from "./Weather.js";
import SuccessSlider from "./test"
import "@fontsource/inter";



function App(){
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [inputValue, setInputValue] = useState("");
  const [units, setUnits] = useState("metric");
  const [unitdisplay, setUnitsDis] = useState("Celcius");
  const [degree, setDegree] = useState("°C")
  const [city, setCity] = useState("London");

  //Rearrange list items
  const dragItem = useRef();
  const dragOverItem = useRef();

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    const copyListItems = [...task];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTask(copyListItems);
  };

  //init list
  const [task, setTask] = useState([
    { taskName: 'Task 1', taskEditable: false },
    { taskName: 'Task 2', taskEditable: false },
    { taskName: 'Task 3', taskEditable: false }
  ]);

  //new button
  function handleNewItem(){
    const newTask = { taskName : 'Untitled', taskEditable: true };
    const newTasks = [...task, newTask];
    setTask(newTasks);
  }

  //handle click on task
  function handleTaskClick(index){
    const newTasks = [...task];
    const allTasksEditable = task.every((task) => task.taskEditable === false);
    
    if (allTasksEditable || task[index].taskEditable === true){
      newTasks[index].taskEditable = true;
      
    }else{
      
      newTasks[index].taskEditable = false;
      
    }

    setTask(newTasks);
  }

  //handle rename
  function handleTaskNameChange(index, newName){
    const newTasks = [...task];
    newTasks[index].taskName = newName;
    newTasks[index].taskEditable = false;
    setTask(newTasks);
    setInputValue("");
  }

  //handle input location{
 
    const handleCityChange = (e) => {
      setCity(prompt("Input City"));
    };

    function handleUnitChange(){
      console.log(degree)
      if (units === "metric"){
        setUnits("imperial");
        setUnitsDis("Farenheit");
        setDegree("°F");
      }
      else{
        setUnits("metric");
        setUnitsDis("Celcius");
        setDegree("°C");
      }
    }

  return (
    <div className="App">
      <Grid container>
        <Grid item md={1.7} className={days[1]} key={days[1].id}>
          <Typography className='DayContainer'  sx={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '16px' }}>{days[0]}</Typography>
          {task.map((task, index) => (
            <Paper draggable onClick={() => handleTaskClick(index)}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop} key = {index.toString()}>
              {task.taskEditable ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {if (e.key === "Enter")
                                      handleTaskNameChange(index, inputValue)}}
                  
                />
              ) : (
                <span>{task.taskName}</span>
              )}
            </Paper>
          ))}
          <Paper onClick={() => handleNewItem()}>Add Task</Paper>
          <Weather city={city} units={units} degree={degree}/>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined">Add Weekly Task</Button>
        <Button variant="outlined">Add Monthly Task</Button>
        <Button variant="outlined">Add Recurring Task</Button>
        <Button variant="outlined" onClick={() => handleUnitChange(units)}>{unitdisplay}</Button>
        <Button variant="outlined" onClick={handleCityChange}>Select Location</Button>
      </Stack>
    </div>
  );
}

export default App;