import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db, auth} from './firebase';
import { Box, Button, Input, Modal } from '@mui/material';
import Typography from '@mui/material/Typography';
import InstagramEmbed from "react-instagram-embed";




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};







function App() {
  // const classes = useStyles();
  // const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState('false');
  // const [registerOpen, setRegisterOpen] = useState(false);

  // useEffect -> Runs a piece of code based on a specific condition
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) =>  {
      if (authUser) {
          // user has logged in...
          console.log(authUser);
          setUser(authUser);
      }else {
        // user has logged out...
        setUser(null);
      }
    })
    
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

    useEffect(() => {
      //this is where the code runs
      db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
        // every time a new post is added, this code fires...
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post:doc.data()
      })));
      })
       
      }, []);

      const signUp = (event) => {
        event.preventDefault();
        
        auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
           return authUser.user.updateProfile({
            displayName: username
          })
        })
        .catch((error) => alert(error.message))
        
        setOpen(false);

      }

      const signIn = (event) => {
        event.preventDefault();

        auth
        .signInWithEmailAndPassword(email, password)
        .catch((error) => alert(error.message)) 

        setOpenSignIn(false);
      }

     
      


  return (

    <div className="App">
   
      

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <form className="app__signup">
            
            <center>
            <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            />
            </center>

           
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
           />
           <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
           />
           <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
           />
           <Button type="submit" onClick ={signUp}>Sign Up</Button>

           </form>
          </Typography>
         
        </Box>
      </Modal>
   
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}

        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <form className="app__signup">
            
            <center>
            <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            />
            </center>
           <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
           />
           <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
           />
           <Button type="submit" onClick ={signIn}>Sign In</Button>

           </form>
          </Typography>
         
        </Box>
      </Modal>
   
    


        <div className="app__header">
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
            />

      { user ? (
      <Button onClick={() => auth.signOut() }>Logout</Button>
        ): (
          <div className="app__loginContainer">
       <Button onClick={() => setOpenSignIn (true) }>Sign In</Button>
       <Button onClick={() => setOpen (true) }>Sign Up</Button>
       </div>
       )}
        </div>

          <div className="app__posts">
            <div className="app__postsLeft">
            {
            posts.map( ({ id, post })=> (
            <Post 
            user={user}
            key={id}
            postId={id} 
            username={post.username} 
            caption={post.caption} 
            imageUrl={post.imageUrl} 
            />
          ))} 
            </div>
              <div className= "app__postsRight">
              <InstagramEmbed
                url='https://www.instagram.com/p/Zw9o4/'
                clientAccessToken='123|456'
                maxWidth={320}
                hideCaption={false}
                containerTagName='div'
                protocol=''
                injectScript
                onLoading={() => {}}
                onSuccess={() => {}}
                onAfterRender={() => {}}
                onFailure={() => {}}
              />
              </div>
            </div>

                {user?.displayName ? (
              <ImageUpload username={user.displayName} />
            ): (
              <h3>Sorry you need to login to upload</h3>
            )}

  </div>
  
  
  );
}

export default App;
