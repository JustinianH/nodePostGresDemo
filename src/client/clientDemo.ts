import axios from "axios";

export const getToDos = async () => {
    
    // Use "await" to stop rest of function execution until call has completed. Useful for when you need the data from your api call in the succeeding lines
    
    const result = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

    console.log(result.data);

    const toDoUser = await axios.get(`https://jsonplaceholder.typicode.com/users/${result.data.userId}`);

    return {
        firstToDo: result.data,
        user: toDoUser.data
    };
};

export const getPostsWithComments = async() => {

    // Use Promise.all to fetch multiple requests concurrently.

    const results = await Promise.all([getPost(), getComments()]);

    const postWithComments = {
        ...results[0].data,
        comments: results[1].data
    }

    return postWithComments;
}

export const getPost = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts/1");
};

export const getComments = () => {
    return axios.get("https://jsonplaceholder.typicode.com/posts/1/comments");
}