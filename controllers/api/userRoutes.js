const router = require('express').Router();
const { User, Thought } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a user by ID
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST (create) a new user
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT (update) a user by ID
router.put('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.status(200).json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});
// POST (create) a new friend
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToset: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with that ID' });
        }
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;