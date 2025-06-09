--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-09 19:20:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16693)
-- Name: assignee_board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assignee_board (
    board_id integer NOT NULL,
    board_name character varying(45) NOT NULL,
    invite_at timestamp without time zone,
    email character varying(45) NOT NULL
);


ALTER TABLE public.assignee_board OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16739)
-- Name: assignee_board_board_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.assignee_board ALTER COLUMN board_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.assignee_board_board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16451)
-- Name: board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board (
    board_name character varying(45) NOT NULL,
    create_at timestamp without time zone,
    email character varying(45),
    edit_at timestamp without time zone
);


ALTER TABLE public.board OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16481)
-- Name: column; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."column" (
    column_name character varying(45) NOT NULL,
    create_at timestamp without time zone NOT NULL,
    board_name character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    edit_at timestamp without time zone
);


ALTER TABLE public."column" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16710)
-- Name: owner_task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.owner_task (
    task_id integer NOT NULL,
    task_name character varying(45) NOT NULL,
    invite_at timestamp without time zone,
    email character varying(45) NOT NULL
);


ALTER TABLE public.owner_task OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16738)
-- Name: owner_task_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.owner_task ALTER COLUMN task_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.owner_task_task_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16496)
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    task_name character varying(45) NOT NULL,
    column_name character varying(45) NOT NULL,
    create_at timestamp without time zone NOT NULL,
    email character varying(45) NOT NULL,
    edit_at timestamp without time zone,
    "position" integer
);


ALTER TABLE public.task OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16446)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    firstname character varying(45) NOT NULL,
    lastname character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(45) NOT NULL,
    create_at timestamp without time zone NOT NULL,
    role character varying(45) NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 16693)
-- Dependencies: 221
-- Data for Name: assignee_board; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assignee_board (board_id, board_name, invite_at, email) FROM stdin;
1	Sience	2025-06-09 17:47:59.799	bbb@example.com
2	Sience	2025-06-09 17:47:59.801	ccc@example.com
6	Bussiness	2025-06-09 17:48:20.135	ccc@example.com
3	Mathematics	2025-06-09 17:48:09.904	aaa@example.com
4	Mathematics	2025-06-09 17:48:09.905	bbb@example.com
5	Mathematics	2025-06-09 17:48:09.906	ccc@example.com
\.


--
-- TOC entry 4929 (class 0 OID 16451)
-- Dependencies: 218
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.board (board_name, create_at, email, edit_at) FROM stdin;
Sience	2025-06-09 17:47:59.797	bbb@example.com	\N
Bussiness	2025-06-09 17:48:20.134	bbb@example.com	\N
Mathematics	2025-06-09 17:48:09.901	bbb@example.com	2025-06-09 18:06:21.104
\.


--
-- TOC entry 4930 (class 0 OID 16481)
-- Dependencies: 219
-- Data for Name: column; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."column" (column_name, create_at, board_name, email, edit_at) FROM stdin;
Astronomy	2025-06-09 17:49:53.784	Sience	bbb@example.com	\N
Biology	2025-06-09 17:50:15.448	Sience	bbb@example.com	\N
Management	2025-06-09 17:59:18.36	Bussiness	bbb@example.com	\N
Statistic	2025-06-09 17:54:55.636	Mathematics	bbb@example.com	\N
Calculus	2025-06-09 17:55:16.386	Mathematics	bbb@example.com	\N
\.


--
-- TOC entry 4933 (class 0 OID 16710)
-- Dependencies: 222
-- Data for Name: owner_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.owner_task (task_id, task_name, invite_at, email) FROM stdin;
10	Mars	2025-06-09 17:51:14.187	aaa@example.com
11	Saturn	2025-06-09 17:51:33.635	aaa@example.com
12	Nucleus	2025-06-09 17:53:08.441	aaa@example.com
13	Ribosomes	2025-06-09 17:53:31.699	aaa@example.com
14	Ribosomes	2025-06-09 17:53:31.701	bbb@example.com
15	Range	2025-06-09 17:56:55.283	aaa@example.com
16	Histogram	2025-06-09 17:57:11.011	aaa@example.com
17	Histogram	2025-06-09 17:57:11.013	bbb@example.com
18	Leadership	2025-06-09 17:59:40.205	aaa@example.com
19	Leadership	2025-06-09 17:59:40.207	bbb@example.com
20	Leadership	2025-06-09 17:59:40.208	ccc@example.com
\.


--
-- TOC entry 4931 (class 0 OID 16496)
-- Dependencies: 220
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (task_name, column_name, create_at, email, edit_at, "position") FROM stdin;
Mars	Astronomy	2025-06-09 17:51:14.184	bbb@example.com	\N	\N
Saturn	Astronomy	2025-06-09 17:51:33.633	bbb@example.com	\N	\N
Nucleus	Biology	2025-06-09 17:53:08.431	bbb@example.com	\N	\N
Ribosomes	Biology	2025-06-09 17:53:31.685	bbb@example.com	\N	\N
Range	Statistic	2025-06-09 17:56:55.256	bbb@example.com	\N	\N
Histogram	Statistic	2025-06-09 17:57:11.009	bbb@example.com	\N	\N
Leadership	Management	2025-06-09 17:59:40.2	bbb@example.com	\N	\N
Sun	Astronomy	2025-06-09 17:51:42.414	bbb@example.com	2025-06-09 18:08:11.019	\N
\.


--
-- TOC entry 4928 (class 0 OID 16446)
-- Dependencies: 217
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (firstname, lastname, email, password, create_at, role) FROM stdin;
aaa	aaa	aaa@example.com	aaa123	2025-06-08 06:28:08.697	Owner
bbb	bbb	bbb@example.com	bbb123	2025-06-08 06:34:27.727	Assignee
ccc	ccc	ccc@example.com	ccc123	2025-06-08 18:20:28.013	Assignee
\.


--
-- TOC entry 4941 (class 0 OID 0)
-- Dependencies: 224
-- Name: assignee_board_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assignee_board_board_id_seq', 6, true);


--
-- TOC entry 4942 (class 0 OID 0)
-- Dependencies: 223
-- Name: owner_task_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.owner_task_task_id_seq', 20, true);


--
-- TOC entry 4772 (class 2606 OID 16698)
-- Name: assignee_board assignee_board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignee_board
    ADD CONSTRAINT assignee_board_pkey PRIMARY KEY (board_id);


--
-- TOC entry 4766 (class 2606 OID 16455)
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (board_name);


--
-- TOC entry 4768 (class 2606 OID 16485)
-- Name: column column_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."column"
    ADD CONSTRAINT column_pkey PRIMARY KEY (column_name);


--
-- TOC entry 4774 (class 2606 OID 16714)
-- Name: owner_task owner_task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner_task
    ADD CONSTRAINT owner_task_pkey PRIMARY KEY (task_id);


--
-- TOC entry 4770 (class 2606 OID 16625)
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (task_name);


--
-- TOC entry 4764 (class 2606 OID 16450)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (email);


--
-- TOC entry 4781 (class 2606 OID 16715)
-- Name: owner_task bm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner_task
    ADD CONSTRAINT bm FOREIGN KEY (task_name) REFERENCES public.task(task_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4778 (class 2606 OID 16725)
-- Name: task bm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT bm FOREIGN KEY (column_name) REFERENCES public."column"(column_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4776 (class 2606 OID 16740)
-- Name: column cm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."column"
    ADD CONSTRAINT cm FOREIGN KEY (board_name) REFERENCES public.board(board_name) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4775 (class 2606 OID 16456)
-- Name: board em; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT em FOREIGN KEY (email) REFERENCES public."user"(email);


--
-- TOC entry 4777 (class 2606 OID 16486)
-- Name: column em; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."column"
    ADD CONSTRAINT em FOREIGN KEY (email) REFERENCES public."user"(email);


--
-- TOC entry 4779 (class 2606 OID 16499)
-- Name: task em; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT em FOREIGN KEY (email) REFERENCES public."user"(email);


--
-- TOC entry 4780 (class 2606 OID 16699)
-- Name: assignee_board em; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assignee_board
    ADD CONSTRAINT em FOREIGN KEY (email) REFERENCES public."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4782 (class 2606 OID 16720)
-- Name: owner_task em; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner_task
    ADD CONSTRAINT em FOREIGN KEY (email) REFERENCES public."user"(email) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2025-06-09 19:20:15

--
-- PostgreSQL database dump complete
--

