-- phpMyAdmin SQL Dump
-- version 3.2.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 10, 2013 at 07:23 PM
-- Server version: 5.1.44
-- PHP Version: 5.3.1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `pagechangedemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE IF NOT EXISTS `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(65000) NOT NULL,
  `md5hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `url`, `md5hash`) VALUES
(1, 'www.andm.gov.za/Pages/Vacancies.aspx', '6f9b8710f02b9b6b5c0a84eee64b55e4'),
(2, 'www.chrishanidm.gov.za/vacancies', 'dbb9fcc1ab5c02053332512610fc2e62'),
(3, 'www.lejwe.co.za/?page_id=1692', ''),
(4, 'www.sedibeng.gov.za/vacancies.html', '85eaae31d04980792b0e33a4e1715a17'),
(5, 'this is a broken link', '');
