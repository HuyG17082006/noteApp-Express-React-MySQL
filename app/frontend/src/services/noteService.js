import Fetch from "./Fetch.js";

const BASE_NOTES_API = '/notes'

export default {
    getAll: async (queryParams) => {
        const queryString = new URLSearchParams(queryParams).toString();
        console.time('getAll')
        const res = await Fetch(`${BASE_NOTES_API}?${queryString}`, {
            method: 'GET'
        });
        console.timeEnd('getAll')
        return res;
    },

    getAllDeleted: async (queryParams) => {

        const queryString = new URLSearchParams(queryParams).toString();

        return await Fetch(`${BASE_NOTES_API}/trash?${queryString}`, {
            method: 'GET'
        });
    },

    addNote: async ({ title, description, isPinned }) => {

        return await Fetch(`${BASE_NOTES_API}`, {
            method: "POST",
            body: JSON.stringify({ title, description, isPinned })
        })
    },

    getDetail: async (id) => {

        return await Fetch(`${BASE_NOTES_API}/${id}`, {
            method: "GET",
        })
    },

    togglePinnedNote: async (id, isPinned) => {

        return await Fetch(`${BASE_NOTES_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                isPinned: !isPinned
            })
        });
    },

    updateNote : async (id, data = {}) => {
        return await Fetch(`${BASE_NOTES_API}/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                ...data
            })
        });
    },

    moveNoteToTrash : async (id) => {

        return await Fetch(`${BASE_NOTES_API}/${id}`, {
            method: "DELETE"
        });
    },

    hardDelete : async (id) => {

        return await Fetch(`${BASE_NOTES_API}/${id}/permanent`, {
            method: "DELETE"
        });
    },

    restoreNote : async (id) => {

        return await Fetch(`${BASE_NOTES_API}/${id}/restore`, {
            method: "PATCH"
        });

    },

    hardDeleteAll : async () => {

        return await Fetch(`${BASE_NOTES_API}/trash`, {
            method: "DELETE"
        });
    }
}