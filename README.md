#Table wireFrame

Overview

This project implements a functional table in React with the following features:

Label 1: A single-select dropdown that prevents duplicate selections across rows.

Label 2: A multi-select dropdown that allows users to:

Select multiple options.

Remove selected options.

Add new options to the dropdown dynamically.

Add New Row: A button to dynamically add new rows to the table.

The table is styled using Tailwind CSS for a clean and responsive design.


Features

Label 1 (Single-Select Dropdown)

Users can select an option from a predefined list of values.

Once an option is selected, it becomes unavailable for other rows.

Users can remove their selection by clicking the Remove (\u00D7) button.

Label 2 (Multi-Select Dropdown)

Users can select multiple options from a predefined list.

Selected options are displayed as tags with a remove button.

Users can add new options to the dropdown by typing in the input box and pressing Enter.

Add New Row

Clicking the Add New Row button appends a new row to the table.

Each row contains independent dropdowns for Label 1 and Label 2.

Technologies Used

React: For building the user interface.

Tailwind CSS: For styling components and maintaining responsive design.

How It Works

State Management:

The useReducer hook is used to manage the complex state of the table.

The state includes rows, Label 1 options, and Label 2 options.

Dynamic Rows:

Rows are added dynamically to the table with independent dropdowns.

Dropdown Logic:

Label 1 options are updated to prevent duplicate selections.

Label 2 supports dynamic additions and tag-style multi-selection.

Customization

Adding Options:

Update the initial options in the initialState variable inside Task.js.

Styling:

Modify Tailwind CSS classes in the JSX to adjust the table design.

