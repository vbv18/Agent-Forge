import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        content: {
            type: String,
        },
    },
    {
        _id: false,
    }
)

export const artifactSchema = new mongoose.Schema(
    {
        id: {
            type: String,
        },
        title: {
            type: String,
        },
        taskType: {
            type: String,
            enum: ["web", "app", "fullstack", "backend", "dsa"],
        },
        language: {
            type: String,
        },
        framework: {
            type: String,
        },
        files: [fileSchema],
    },
    {
        _id: false,
    },
);
