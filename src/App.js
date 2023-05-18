import './App.css';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useState, useRef } from 'react';
import Weather from "./Weather.js";
import "@fontsource/inter";
import { Container } from '@mui/system';
import { Card } from '@mui/material';



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
    
      <Container sx={{px: '30px', py:'30px'}} className="App">
      <Grid container>
        <Grid item md={1.7} className={days[0]} key={days[0].id} >
          <Typography className='DayContainer'  
            sx={{ fontFamily: 'Inter', fontWeight: 900, fontSize: '32px', textAlign: 'left', mb:'10px' }}>
              {days[0]}
          </Typography>
          <Stack sx={{backgroundColor: '#FFF7E2', border: 2, borderColor: '#706445', minHeight:'300px', mb:'15px', direction:"column", justifyContent:'space-between'
          , boxShadow: '0px 0px 8px -4px inset'}}>
            <Container disableGutters>
              {task.map((task, index) => (
                <Paper elevation='1' square  sx={{backgroundColor:'#FFE8AE', height:'30px', lineHeight:'30px', my:'2px'}} draggable onClick={() => handleTaskClick(index)}
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
            </Container>
            
          <Button variant="text" onClick={() => handleNewItem()} sx={{position:'relative', bottom:'0', color:'#000000'}}>Add Task</Button>
          
          
          </Stack>
          <Card sx={{backgroundColor: '#FFF7E2', border: 2, borderColor: '#706445', borderRadius:'10px', mb:'15px', boxShadow: '0px 0px 8px -4px inset'}} elevation={0}>
            <Weather city={city} units={units} degree={degree} day={days[0]}/>
          </Card>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} className='Buttons'>
        <Button variant="outlined">Add Weekly Task</Button>
        <Button variant="outlined">Add Monthly Task</Button>
        <Button variant="outlined">Add Recurring Task</Button>
        <Button variant="outlined" onClick={() => handleUnitChange(units)}>{unitdisplay}</Button>
        <Button variant="outlined" onClick={handleCityChange}>Select Location</Button>
      </Stack>
      </Container>
      
      
    
  );
}

export default App;