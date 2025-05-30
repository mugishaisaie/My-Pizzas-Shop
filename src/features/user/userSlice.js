import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { builders } from "prettier/doc.js";
import {getAddress} from "../../services/apiGeocoding";


function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk('user/fetchAddress', async ()=>{

  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in

  // This DATA WE RETURN HERE WILL BE THE PAYLOAD OF THE fetchAddress.fulfilled ACTION
  return { position, address };
  
})




const initialState ={
  username: '',
  status: 'idle',
  address: '',
  error:'',
  position: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{

    updateName(state,action){
      state.username = action.payload;
    }
  },
  extraReducers: (builders)=> builders.addCase(fetchAddress.pending,(state,action)=>{
    state.status = 'loading';
  }).addCase(fetchAddress.fulfilled,(state,action)=>{
    state.address = action.payload.address;
    state.position = action.payload.position;
    state.status = 'idle';
  }).addCase(fetchAddress.rejected,(state,action)=>{
    state.status ='error';
    state.error = 'There was a problem with getting your Location Address.Please fill the filed';
  })
})

export const {updateName} = userSlice.actions;

export default userSlice.reducer;