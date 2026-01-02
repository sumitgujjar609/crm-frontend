
const NavTabItems = [
    {
        label: "Dashboard",
        path: "/dashboard",
        allowedRoles: ["Admin", "Counsellor", "Hr"],
    },
    {
        label: "Profile",
        path: "/profile",
        allowedRoles: ["Admin", "Counsellor", "Hr"],
    },
    {
        label: "Add Student",
        path: "/add-student",
        allowedRoles: ["Admin", "Counsellor"],
    },
    {
        label: "Students",
        path: "/students",
        allowedRoles: ["Admin", "Counsellor"],
    },

    // {
    //     label: "Alumni",
    //     path: "/alumni",
    //     allowedRoles: ["Admin", "Counsellor"],
    // },
    {
        label: "Add New Course",
        path: "/add-course",
        allowedRoles: ["Admin", "Counsellor"],
    },
    {
        label: "Courses",
        path: "/courses",
        allowedRoles: ["Admin", "Counsellor"],
    },
    {
        label: "Placements",
        path: "/placements",
        allowedRoles: ["Admin", "Hr"],
    },
    {
        label: "Resumes",
        path: "/resumes",
        allowedRoles: ["Admin", "Hr"],
    },
];

export default NavTabItems;
