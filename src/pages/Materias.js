<Box width={400} sx={{ px: 2.5, pb: 3, mt: 10 }}>
          <Stack
            alignItems="center"
            spacing={3}
            sx={{
              p: 2.5,
              pt: 5,
              borderRadius: 2,
              position: 'relative',
              bgcolor: 'grey.200'
            }}
          >
            <Box
              component="img"
              src="/static/icons/majorIcon.png"
              sx={{ width: 100, position: 'absolute', top: -50 }}
            />

            <Box sx={{ textAlign: 'center' }}>
              <Typography gutterBottom variant="h6">
                Especialidades
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Ver, Agregar, Editar, Borrar y Buscar especialidades
              </Typography>
            </Box>

            <Button
              fullWidth
              to={'/dashboard/major'}
              component={RouterLink}
              variant="contained"
            >
              Ir

            </Button>
          </Stack>
        </Box>