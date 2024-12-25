import Post from "../model/post.js";

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('createdBy', 'name')
        res.status(200).json({ posts })
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(400).json({ error: 'Postingan tidak ditemukan' })
    try {
        return res.status(200).json({ post })
    } catch (error) {
        next(error)
    }
}

export const createPost = async (req, res, next) => {
    if (!req.file) {
        res.status(400).json({ error: 'Tidak ada file yang diunggah' });
    }
    const { title, content } = req.body;
    const image = req.file.filename;
    try {
        const newPost = new Post({
            title,
            content,
            image,
            createdBy: req.user.userId,
        });
        const savedPost = await newPost.save();
        res.status(201).json({ post: savedPost });
    } catch (error) {
        next(error)
    }
}

export const updatePost = async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    // let img; 
    try {
        const updPost = {
            title,
            content,
            createdBy: req.user.userId,
        }
        if (req.file) updPost.image = req.file.filename;
        // if(image) updPost.image = image;
        // if(req.file){
        //     img = req.file.filename;
        //     updPost.image = img;
        // } 

        const updatedPost = await Post.findOneAndUpdate(
            { _id: id },
            { $set: updPost },
            { new: true }
        )
        return res.status(200).json(updatedPost)
    } catch (error) {
        next(error)
    }
}

export const deletePost = async (req, res, next) => {
    const { id } = req.params;
    try {
        const delPost = await Post.findByIdAndDelete({ _id: id })
        return res.status(200).json({ message: "Berhasil menghapus konten", delPost })
    } catch (error) {
        next(error)
    }
}