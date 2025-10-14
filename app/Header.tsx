"use client";
import Link from 'next/link';
import Image from 'next/image';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import InstallBadge from '@/components/pwa/InstallBadge';


export default function Header() {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 3 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <Image src="/logo-xyz.svg" alt="XYZ LogicFlow" width={28} height={28} priority />
            <Typography variant="h6" sx={{ ml: 1, fontWeight: 700 }}>OptiLog</Typography>
          </Link>
          <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>XYZ LogicFlow Technology</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button component={Link} href="/" color="inherit">Home</Button>
          <Button component={Link} href="/status" color="inherit">Status</Button>
          <Button component={Link} href="/posts" color="inherit">Posts</Button>
          <InstallBadge />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
