import React from 'react'

const CategoryForm = ({ value, submitHandler, setValue }) => {
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <input type="text" className="form-control" id="exampleInputSearch" value={value} onChange={(e) => {
                        setValue(e.target.value);
                    }} placeholder="Enter new category" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    )
}

export default CategoryForm

