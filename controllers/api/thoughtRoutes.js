const router = require('express').Router();
const { User, Thought }  = require('../../models');

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts)
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json(thought);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
              message: 'Thought created, but found no user with that ID',
            })
          }

        res.status(200).json(thought);
    }
    catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json(thought);
    }
    catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId })

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId }},
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'Thought deleted but no user with that ID' });
        }

        res.status(200).json({message: 'Thought successfully deleted!'});
    }
    catch {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json(thought);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }

        res.status(200).json(thought);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;