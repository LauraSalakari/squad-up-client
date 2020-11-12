import React from 'react'

export default function ChatLog(props) {
    const [user, setUser] = useState(props.user);
    const [sqauds, setSquads] = useState(null);

    useEffect(() => {
        Axios.get(`${API_URL}/profile/${user._id}/squads`, { withCredentials: true })
        .then((response) => {
            setSquads(response.data);
        })
    }, [])

    return (
        <div>
            
        </div>
    )
}
