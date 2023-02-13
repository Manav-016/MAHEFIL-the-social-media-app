import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    console.log(req);
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.friends.map((friendId) => {
        User.findById(friendId);
      })
    );

    const friendsFormatted = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(friendsFormatted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    console.log(".....add remove friends");
    if (user.friends.includes(friendId)) {
      user.friends.filter((id) => id !== friendId);
      friend.friends.filter((id) => id !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((friendId) => {
        console.log(friendId);
        return User.findById(friendId);
      })
    );

    console.log(friends);

    const friendsFormatted = friends.map(
      ({ _id, firstName, lastName, occupation, location, picturePath }) => {
        return {
          _id,
          firstName,
          lastName,
          occupation,
          location,
          picturePath,
        };
      }
    );

    res.status(200).json(friendsFormatted);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
