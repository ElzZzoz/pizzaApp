import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../service/apiGeocoding";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  // This will become the action payload in the fulfilled reducer
  return { position, address };
});

const initialState = {
  username: "",
  status: "idle",
  address: "",
  position: {}, // Changed to empty object for better initial state
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      // Case for when the Promise is fulfilled (successful)
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      // Case for when the Promise is rejected (failed)
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        // You can get the error message from the action
        state.error =
          "There was a problem getting your address. Please fill it in manually.";
      });
  },
});

export const { updateUsername } = userSlice.actions;
export default userSlice.reducer;
