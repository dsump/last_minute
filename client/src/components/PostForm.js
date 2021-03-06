import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { 
    Form,
    Row,
    Col,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap'
import axios from 'axios'



const PostForm = ({ update, setUpdate, posts, setPosts}) => {

    const [ formState, setFormState ] = useState({ title: '', description: '', upvotes: 0})
    const [ added, setAdded ] = useState(false)

    const handleChange = e => {
        const { name, value } = e.target
        setFormState(prevState => ({
            ...prevState, [name]: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(formState)
        console.log(posts)
        setPosts(posts => ({
            ...posts, formState
        }))
        setUpdate(!update)

        axios
            .post('http://localhost:8000/api/posts', formState)
            .then(() => {setAdded(!added)})
            .catch(err => console.error(err))
    }

    return(
        <Form onSubmit={ handleSubmit }>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                        <Label for="title">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="Post Title"
                            type="text"
                            value={ formState.title}
                            onChange={ e => handleChange(e) }
                        />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="description">
                            Share what you learned today!
                        </Label>
                        <Input
                            id="description"
                            name="description"
                            type="textarea"
                            placeholder='What did you learn today?'
                            value={ formState.description }
                            onChange={ e => handleChange(e) }
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Button type='submit'>
                Submit Post
            </Button>
        </Form>
    )
}

export default PostForm