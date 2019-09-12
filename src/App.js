import React from 'react';

const averageCard = (grades, average = 0, sum = 0) => {
  console.log(grades)
  console.log(grades.assignments.length)
  for (let i = 0; i < grades.assignments.length; i++) {
    sum += grades.assignments[i].assignmentGrade
  }
  average = sum / grades.assignments.length
  average = average.toFixed(2)
  return (
    <h3>Average: {average}</h3>
  )
}

const assignmentCard = (item,i) => {
  return (
    // We kept getting an error because react wanted a unique key
    // it still runs but it's annoying.
    // Brandon showed us this industry trick.
    <div key={`assignment-card-index-${i}`}>    {/* empty tags are Fragments, which don't map to DOM nodes. They return multiple cells or list items. */}
      <li>{item.assignmentName}</li>
      <li>{item.assignmentGrade}</li>
    </div>
  )
}

// You can only have one map, otherwise you will have an infinite loop
const courseCard = (crs) => {
  return (
    <div>
      <h3>{crs.courseName}</h3>   {/* BY101 */}
      <ul>
        {crs.assignments.map(assignmentCard)}
        {averageCard(crs)}
      </ul>
    </div>
  )
}

// ADDED FORM as CLASS
// We had newGrade set to 0.  By changing it to a empty string, the placeholder 
// of grade appears in the form's input box
class CourseForm extends React.Component {

  state = {
    newAssignment: "",
    newGrade: ""
  }

  // We used two seperate handleInput methods because one caused the other to update
  // with it's information
  handleInputChangeAssignment = (evnt) => {
    this.setState({ newAssignment: evnt.target.value })
  }
  handleInputChangeGrade = (evnt) => {
    this.setState({ newGrade: Number(evnt.target.value) })
  }

  // The data would not post.
  // Brandon used a picking technique to pull out only what data was needed from state
  // newAssignment and newGrade assigning it the values from state
  handleFormSubmission = (evnt) => {
    evnt.preventDefault()
    const {newAssignment, newGrade} = this.state
    // This statement runs the method to add the assignment, passing two arguments
    this.props.addAssigment(newAssignment, newGrade)
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmission}>
        <input
          type="text"
          placeholder="assignment name"
          value={this.state.newAssignment}
          onChange={this.handleInputChangeAssignment}
        />

        <input
          type="number"
          placeholder="grade"
          value={this.state.newGrade}
          onChange={this.handleInputChangeGrade}
        />

        <input
          type="submit" value="add"
        />
      </form>
    )
  }
}

class App extends React.Component {

  state = {
    course:
    {
      courseName: "BY101",
      assignments: [
        {
          assignmentName: "Quiz1",
          assignmentGrade: 100
        },
        {
          assignmentName: "Quiz2",
          assignmentGrade: 100
        },
        {
          assignmentName: "Quiz3",
          assignmentGrade: 80
        }
      ]
    }
  }

  addNewAssignment = (newAssignment, newGrade) => {
    //create a copy of our course
    let course = { ...this.state.course }

    // assignments is an array of objects: assignmentName and assignmentGrade
    course.assignments.push({assignmentName: newAssignment, assignmentGrade: newGrade})

    this.setState({ course })
  }

  render() {
    return (
      <div>
        <h1>Homework Tracker</h1>
        <CourseForm
          addAssigment={this.addNewAssignment}
        />
        {courseCard( this.state.course )}
      </div >
    )
  }
}

export default App;