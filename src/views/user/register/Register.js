import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, CssBaseline,
    Paper, Grid, Typography,
    TextField
} from '@material-ui/core';
import {
    School, Mail,
    AssignmentInd, Lock, Translate
} from '@material-ui/icons';
import { newUserAccount } from '../../../api/user/api';

import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(1),
            padding: theme.spacing(3),
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    box: {
        textAlign: 'center',
    }
}));

const Register = () => {
    const classes = useStyles();
    const history = useHistory();
    const [errorMsg, setErrorMsg] = useState("");
    const [errorComponent, setErrorComponent] = useState([]);
    const [SchoolID, setSchoolID] = useState("");
    const [StudentID, setStudentID] = useState("");
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [RealName, setRealName] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");

    const ErrorMsg = () => {
        if (errorMsg === "")
            return null;
        return (
            <Alert severity='error'>
                <AlertTitle>請注意</AlertTitle>
                {errorMsg}
            </Alert>
        );
    }
    const submit = () => {
        const options = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
        };
        const errorList = [];
        let errorMsg = "";
        let errorOccurred = false;
        if (SchoolID === "") {
            errorMsg += "未填寫學校代號 ";
            errorList.push("SchoolID");
            errorOccurred = true;
        }
        if (StudentID === "") {
            errorMsg += "未填寫學號 ";
            errorList.push("StudentID");
            errorOccurred = true;
        }
        if (Email === "") {
            errorMsg += "未填寫電子信箱 ";
            errorList.push("Email");
            errorOccurred = true;
        }
        if (Email !== "") {
            if (!Email.includes("@") || !Email.includes(".com")) {
                errorMsg += "電子信箱格式錯誤 ";
                errorList.push("Email");
                errorOccurred = true;
            }
        }

        if (RealName === "") {
            errorMsg += "未填寫真實姓名 ";
            errorList.push("RealName");
            errorOccurred = true;
        }
        if (Password === "") {
            errorMsg += "未填寫密碼 ";
            errorList.push("Password");
            errorOccurred = true;
        }
        if (ConfirmPassword === "") {
            errorMsg += "未填寫確認密碼 ";
            errorList.push("ConfirmPassword");
            errorOccurred = true;
        }
        if (Password !== ConfirmPassword) {
            errorMsg += "密碼錯誤 ";
            errorOccurred = true;
        }

        setErrorMsg(errorMsg);
        setErrorComponent(errorList);
        if (errorOccurred)
            return;

        newUserAccount(SchoolID, StudentID, Email, UserName, RealName, Password)
            .then((rs) => {
                const data = rs.data;
                toast.info(data.message, options);
                history.push('/');
            })
            .catch((err) => {
                const data = err.response.data;
                toast.error(data.message, options);
            })
    }

    return (
        <>
            <Paper className={classes.paper}>
                <Typography component="h4" variant="h4" align="center">
                    註冊
            </Typography>
                <ErrorMsg />
                <CssBaseline />
                <div className={classes.box}>
                    <Grid container spacing={5} justify='center'>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <School />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="SchoolID"
                                    error={errorComponent.includes("SchoolID")}
                                    value={SchoolID}
                                    onChange={(event) => setSchoolID(event.target.value)}
                                    label="學校代碼"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <AssignmentInd />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="StudentID"
                                    error={errorComponent.includes("StudentID")}
                                    value={StudentID}
                                    onChange={(event) => setStudentID(event.target.value)}
                                    label="學號"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <Mail />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="UserName"
                                    error={errorComponent.includes("UserNameEmail")}
                                    value={UserName}
                                    onChange={(event) => setUserName(event.target.value)}
                                    label="暱稱"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <Translate />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="RealName"
                                    error={errorComponent.includes("RealName")}
                                    value={RealName}
                                    onChange={(event) => setRealName(event.target.value)}
                                    label="真實姓名"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={12} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <Mail />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="Email"
                                    error={errorComponent.includes("Email")}
                                    value={Email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    label="電子信箱"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <Lock />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="Password"
                                    error={errorComponent.includes("Password")}
                                    value={Password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    label="密碼"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={6} justify='center'
                            container alignItems="flex-end" spacing={1}>
                            <Grid item xs='auto'>
                                <Lock />
                            </Grid>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    id="ConfirmPassword"
                                    error={errorComponent.includes("ConfirmPassword")}
                                    value={ConfirmPassword}
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    label="確認"
                                    type="password"
                                />
                            </Grid>
                        </Grid>
                        <Grid
                            item xs={12} md={4} justify='center'
                            container alignItems="flex-end" spacing={1}
                        >
                            <Button
                                fullWidth
                                onClick={submit}
                                variant="contained"
                                color="primary"
                            >
                                註冊
                    </Button>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
        </>
    );
}

export default Register;