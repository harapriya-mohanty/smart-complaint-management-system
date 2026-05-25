# Smart Complaint System — Backend

## Setup

```bash
cd backend
npm install
```

## Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-complaint-system
JWT_SECRET=your_super_secret_key_change_this
```

## Run

```bash
# Development (auto-restart)
npm run dev

# Production
npm start
```

## API Endpoints

### Auth
| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/profile | Get own profile (protected) |

### Complaints
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/complaints | Get complaints (role-filtered) |
| POST | /api/complaints | Create complaint |
| GET | /api/complaints/:id | Get complaint by ID |
| PUT | /api/complaints/:id/status | Update status |
| PUT | /api/complaints/:id/assign | Assign worker (admin only) |
| PUT | /api/complaints/:id/verify | Resident verify completion |

### Admin
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/admin/analytics | Dashboard stats |
| GET | /api/admin/workers | All workers |
| GET | /api/admin/residents | All residents |
| DELETE | /api/admin/users/:id | Delete user |

### Workers
| Method | Route | Description |
|--------|-------|-------------|
| GET | /api/workers/tasks | Assigned tasks |
| PUT | /api/workers/tasks/:id | Update task |
| GET | /api/workers/history | Completed work history |

## Roles
- `admin` — Full access
- `resident` — Submit and view own complaints
- `worker` — View assigned tasks, update status
