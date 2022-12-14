import { async } from "@firebase/util";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";



export default ({ userObj, refreshUser }) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/"); 
    };
    const getMyNweets = async () => {
        const nweets = await dbService
            .collection("nweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt", "desc")
            .get();

        console.log(nweets.docs.map((doc) => doc.data()));
    }
    useEffect(() => {
        getMyNweets();
    }, []);
    
    const onChange = (event) => {
        const {
            target : {value}
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName : newDisplayName,
            });
            refreshUser();
        }

    }; 
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange} 
                    type="text" 
                    placeholder="Display name"
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};